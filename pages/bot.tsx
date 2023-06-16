import Layout from "../components/layout";
import Chatbot from "../components/chatbot";

export default function Index() {
  return (
    <div className="max-w-2xl shadow-sm m-auto">
      <Layout>
        <Chatbot />
      </Layout>
    </div>
  );
}
