import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const MemberForm = ({ member, onSave, onCancel }) => {
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
        const memberRef = doc(db, "seniorMembers", member.id);
        await updateDoc(memberRef, memberData);
      } else {
        await addDoc(collection(db, "seniorMembers"), memberData);
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
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Zapisywanie..." : "Zapisz"}
      </button>
      <button type="button" onClick={onCancel}>
        Anuluj
      </button>
    </form>
  );
};

export default MemberForm;
