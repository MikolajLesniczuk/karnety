import React, { useState, useEffect } from "react";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const SeniorGroup = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const q = query(collection(db, "seniorMembers"), orderBy("expiryDate"));
      const querySnapshot = await getDocs(q);
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
        const memberRef = doc(db, "seniorMembers", editingMember.id);
        await updateDoc(memberRef, member);
      } else {
        await addDoc(collection(db, "seniorMembers"), member);
      }
      // Fetch the updated members list
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
      const memberRef = doc(db, "seniorMembers", id);
      await deleteDoc(memberRef);
      fetchMembers(); // Fetch the updated members list
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleCancel = () => {
    setEditingMember(null);
  };

  return (
    <div>
      <h1>Starzy</h1>
      <MemberForm
        member={editingMember}
        onSave={handleSave}
        onCancel={handleCancel}
        onClick={fetchMembers}
        collectionName="seniorMembers" // Przekazujemy nazwę kolekcji
      />
      <MemberList
        members={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SeniorGroup;
