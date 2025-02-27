import Header from "../components/header/header";
import Main from "../components/main/main";
import Footer from "../components/footer/footer";

export default function Contact() {
  return (
    <div className={"contact-page"}>
      <Header />
      <Main page={"contact"} />
      <Footer />
    </div>
  )
}