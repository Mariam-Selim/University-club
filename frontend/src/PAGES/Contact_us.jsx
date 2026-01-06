import Navbar from "../Component/Navbar/Navbar.jsx";
import Footer from "../Component/Footer/Footer.jsx";
import Tabs from "../Component/Tabs/Tabs.jsx";
import Photo from "../Component/Photo/Photo.jsx"
import Contact from "../Component/Contact/Contact.jsx"
import styled from "styled-components";
import React from "react";
const ContactPageContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: flex-start;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 12px;
  }
  @media (max-width: 400px) {
    flex-direction: column; 
  }
`;

const TabsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 0 0 35%;
   @media (max-width: 768px) {
    grid-template-columns: 1fr; 
    width: 30%;
  }
  @media (max-width: 400px) {
    order: 2; 
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 5px;
    padding:0;
  }
`;
const FormWrapper = styled.div`
   flex: 0 0 60%;

  @media (max-width: 768px) {
    flex: 0 0 65%;
  }
  @media (max-width: 400px) {
    order: 1;       
    width: 100%;
  }
`;

function Contact_us() {
  return (
    <>
      < Photo />
      < Navbar />
      <ContactPageContainer>
        <TabsGrid>
          <Tabs
          onClick={() => {
                navigator.clipboard.writeText("+201229952830");
                alert("Phone number copied ");
              }}
          media={<i className="fa-solid fa-phone"></i>} description="Phone" />
          <a href="https://eman2004259@gmail.com" style={{ textDecoration: "none" }}>
            <Tabs media={<i className="fa-solid fa-envelope"></i>} description="Email" />
          </a>
          <a href="https://api.whatsapp.com/qr/QCELYZLVIFV6P1?autoload=1&app_absent=0" style={{ textDecoration: "none" }}>
            <Tabs media={<i className="fa-brands fa-square-whatsapp"></i>} description="Whatsapp" />
          </a>
          <a href="https://www.facebook.com/share/1DTVMDqu6U/" style={{ textDecoration: "none" }}>
            <Tabs media={<i className="fa-brands fa-square-facebook"></i>} description="Facebook" />
          </a>
        </TabsGrid>
        < FormWrapper>
          < Contact />
        </FormWrapper>
      </ContactPageContainer>
      < Footer />
    </>
  );
}
export default Contact_us;