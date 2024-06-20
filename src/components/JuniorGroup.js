import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
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
      const sortedMembers = membersData.sort((a, b) => {
        return new Date(a.expiryDate) - new Date(b.expiryDate);
      });
      setMembers(sortedMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleSave = async (member) => {
    try {
      if (editingMember) {
        const memberRef = doc(db, "juniorMembers", editingMember.id);
        await updateDoc(memberRef, member);
      } else {
        await addDoc(collection(db, "juniorMembers"), member);
      }
      setEditingMember(null);
      fetchMembers();
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
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleCancel = () => {
    setEditingMember(null);
  };

  return (
    <div>
      <h1>Młodziaki</h1>
      <MemberForm
        member={editingMember}
        onSave={handleSave}
        onCancel={handleCancel}
        onClick={fetchMembers}
        collectionName="juniorMembers" // Przekazujemy nazwę kolekcji
      />
      <MemberList
        members={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default JuniorGroup;
