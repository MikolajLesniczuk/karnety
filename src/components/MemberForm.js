import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const MemberForm = ({ member, onSave, onCancel, onClick, collectionName }) => {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setExpiryDate(member.expiryDate);
    } else {
      setName("");
      setExpiryDate("");
    }
  }, [member]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const memberData = { name, expiryDate };

    try {
      if (member && member.id) {
        const memberRef = doc(db, collectionName, member.id); // Używamy collectionName do określenia kolekcji
        await updateDoc(memberRef, memberData);
      } else {
        await addDoc(collection(db, collectionName), memberData); // Używamy collectionName do określenia kolekcji
      }
      onSave(); // Remove the parameter
      setName("");
      setExpiryDate("");
    } catch (error) {
      console.error("Error saving member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Imię i Nazwisko:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data ważności karnetu:</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
      </div>
      <button onClick={onClick} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Zapisywanie..." : "Zapisz"}
      </button>
      <button type="button" onClick={onCancel}>
        Anuluj
      </button>
    </form>
  );
};

export default MemberForm;
