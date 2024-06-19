import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Importuj instancję bazy danych Firestore
import { collection, addDoc, updateDoc } from "firebase/firestore";

const MemberForm = ({ member, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    if (member) {
      setName(member.name);
      setExpiryDate(member.expiryDate);
    } else {
      // Jeśli member jest null, czyścimy formularz
      setName("");
      setExpiryDate("");
    }
  }, [member]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberData = { name, expiryDate };

    try {
      if (member) {
        const memberRef = collection(db, "seniorMembers").doc(member.id); // Poprawka: doc(member.id) zamiast collection(db, "seniorMembers", member.id)
        await updateDoc(memberRef, memberData);
      } else {
        const docRef = await addDoc(
          collection(db, "seniorMembers"),
          memberData
        );
        memberData.id = docRef.id; // Dodajemy ID nowo dodanego dokumentu do danych członka
      }
      onSave(memberData);
      setName(""); // Wyczyszczenie stanu formularza po zapisaniu
      setExpiryDate(""); // Wyczyszczenie stanu formularza po zapisaniu
    } catch (error) {
      console.error("Error saving member:", error);
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
      <button type="submit">Zapisz</button>
      <button type="button" onClick={onCancel}>
        Anuluj
      </button>
    </form>
  );
};

export default MemberForm;
