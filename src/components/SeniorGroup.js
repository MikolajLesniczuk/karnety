import React, { useState, useEffect } from "react";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";
import { db } from "../firebase"; // Importuj instancję bazy danych Firestore
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const SeniorGroup = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  // Pobierz wszystkich członków z Firestore
  const fetchMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "seniorMembers"));
      const membersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(membersData);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // Zapisz lub zaktualizuj członka w Firestore
  const handleSave = async (member) => {
    try {
      if (editingMember) {
        const memberRef = doc(db, "seniorMembers", editingMember.id);
        await updateDoc(memberRef, member);
      } else {
        await addDoc(collection(db, "seniorMembers"), member);
      }
      await fetchMembers(); // Odśwież listę członków po zapisie lub aktualizacji
      setEditingMember(null);
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  // Edytuj wybranego członka
  const handleEdit = (member) => {
    setEditingMember(member);
  };

  // Usuń wybranego członka z Firestore
  const handleDelete = async (id) => {
    try {
      const memberRef = doc(db, "seniorMembers", id);
      await deleteDoc(memberRef);
      await fetchMembers(); // Odśwież listę członków po usunięciu
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // Anuluj edycję lub dodawanie nowego członka
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
        members={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SeniorGroup;
