import React, { useState } from "react";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";

const initialJuniorMembers = [
  { id: 3, name: "Piotr Wiśniewski", expiryDate: "2024-01-15" },
  { id: 4, name: "Katarzyna Zielińska", expiryDate: "2024-02-28" },
];

const JuniorGroup = () => {
  const [members, setMembers] = useState(initialJuniorMembers);
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
      <h1> Młodziaki</h1>
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

export default JuniorGroup;
