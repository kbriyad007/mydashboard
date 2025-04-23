import dynamic from "next/dynamic";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/firebase"; // adjust if needed
import RequestTable from "@/components/RequestTable";
import { RequestData } from "@/types";

export default async function Page() {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "requests"));
  const requests: RequestData[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RequestData[];

  return (
    <main className="p-4 max-w-screen-2xl mx-auto">
      <RequestTable requests={requests} loading={false} error={""} />
    </main>
  );
}

