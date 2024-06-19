import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";

const JuniorGroup = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, "juniorMembers"));
      const membersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(membersData);
    };

    fetchMembers();
  }, []);

  const handleSave = async (member) => {
    if (editingMember) {
      const memberRef = doc(db, "juniorMembers", editingMember.id);
      await updateDoc(memberRef, member);
    } else {
      await addDoc(collection(db, "juniorMembers"), member);
    }
    const querySnapshot = await getDocs(collection(db, "juniorMembers"));
    const membersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMembers(membersData);
    setEditingMember(null);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "juniorMembers", id));
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleCancel = () => {
    setEditingMember(null);
  };

  // Sortowanie członków - przeterminowane na samej górze
  const sortedMembers = [...members].sort((a, b) => {
    const expiryDateA = new Date(a.expiryDate);
    const expiryDateB = new Date(b.expiryDate);
    return expiryDateA - expiryDateB; // Sortowanie od najwcześniejszej daty
  });

  return (
    <div>
      <h1>Młodziaki</h1>
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
