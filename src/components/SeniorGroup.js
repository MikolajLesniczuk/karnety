import React, { useState } from "react";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";

const initialSeniorMembers = [
  { id: 1, name: "Jan Kowalski", expiryDate: "2024-06-30" },
  { id: 2, name: "Anna Nowak", expiryDate: "2023-12-31" },
];

const SeniorGroup = () => {
  const [members, setMembers] = useState(initialSeniorMembers);
  const [editingMember, setEditingMember] = useState(null);

  // Sortowanie członków - przeterminowane na samej górze
  const sortedMembers = [...members].sort((a, b) => {
    const expiryDateA = new Date(a.expiryDate);
    const expiryDateB = new Date(b.expiryDate);
    return expiryDateA - expiryDateB; // Sortowanie od najwcześniejszej daty
  });

  const handleSave = (member) => {
    if (editingMember) {
      setMembers(members.map((m) => (m.id === member.id ? member : m)));
    } else {
      setMembers([...members, member]);
    }
    setEditingMember(null);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleDelete = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleCancel = () => {
    setEditingMember(null);
  };

  return (
    <div>
      <h1>Stare dziady</h1>
      <MemberForm
        member={editingMember}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <MemberList
        members={sortedMembers} // Używamy posortowanej listy
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SeniorGroup;
