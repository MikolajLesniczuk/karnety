import React, { useState } from "react";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";

const initialMembers = [
  { id: 1, name: "Jan Kowalski", expiryDate: "2024-06-30" },
  { id: 2, name: "Anna Nowak", expiryDate: "2023-12-31" },
  { id: 3, name: "Piotr Wiśniewski", expiryDate: "2024-01-15" },
];

const MembershipChecker = () => {
  const [members, setMembers] = useState(initialMembers);
  const [editingMember, setEditingMember] = useState(null);

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
      <h1>Membership Expiry Checker</h1>
      <MemberForm
        member={editingMember}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <MemberList
        members={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MembershipChecker;
