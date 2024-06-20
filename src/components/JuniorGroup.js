import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";

const JuniorGroup = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "juniorMembers"));
      const membersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(membersData);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleSave = async (member) => {
    try {
      if (editingMember) {
        const memberRef = doc(db, "juniorMembers", editingMember.id);
        await updateDoc(memberRef, member);
        setMembers((prevMembers) =>
          prevMembers.map((m) =>
            m.id === editingMember.id ? { id: editingMember.id, ...member } : m
          )
        );
      } else {
        const docRef = await addDoc(collection(db, "juniorMembers"), member);
        setMembers((prevMembers) => [
          ...prevMembers,
          { id: docRef.id, ...member },
        ]);
      }
      setEditingMember(null);
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleDelete = async (id) => {
    try {
      const memberRef = doc(db, "juniorMembers", id);
      await deleteDoc(memberRef);
      setMembers((prevMembers) => prevMembers.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
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
