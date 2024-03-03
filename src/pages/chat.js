import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ChatBox from '../components/ChatBox';

export default function Chat() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className="flex-1 overflow-auto">
        <ChatBox />
      </main>
      <Footer />
    </div>
  );
}

