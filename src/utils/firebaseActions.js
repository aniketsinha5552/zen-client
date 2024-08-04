import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase";

export async function addChatFb(data){
    const chatref = collection(db, 'chat');

    let body= {
        message: data.message,
        sender: data.sender,
        created_at: new Date().toISOString(),
        email: data.email
    }
    await addDoc(chatref,body)
}

export async function getChatFb(user){
    const chatRef = collection(db, "chat");
    const q = query(chatRef, where("email", "==", user?.email));
    const data = await getDocs(q);
    const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    return filteredData
}