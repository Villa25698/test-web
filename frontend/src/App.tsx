import Header from './Header';
import Bio from './Bio';
import Projects from './Projects';
import Footer from './Footer';  
import ContactForm from './ContactForm';

function App() {
  return (
    <>
      <Header />
      <main>
        <Bio />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
