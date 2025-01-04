import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import PageTitle from "../../components/pageTitle/PageTitle";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const TermsConditions = () => {
  return (
    <div className="container mx-auto">
      <PageTitle
        title="Blog Portal - "
        decoratedText="Terms and Conditions"
        slogan="By accessing or using the Dragon News Portal, you agree to comply with
        these Terms and Conditions, as well as any additional guidelines, rules."
        navigationLink="register"
        navigationArea="Go to Register Page"
      />

      <div className="lg:max-w-5xl mx-auto w-full lg:px-0 px-2 lg:py-10 py-5 text-justify">
        <p>
          By accessing or using the Dragon News Portal, you agree to comply with
          these Terms and Conditions, as well as any additional guidelines,
          rules, or terms posted on the Service. You also agree to comply with
          all applicable laws and regulations.
        </p>
        <SectionTitle title="1. Disclaimer" />
        <p>
          Dragon News reserves the right to modify or revise these Terms and
          Conditions at any time, without notice. Changes to the Terms and
          Conditions will be effective immediately upon posting on the Dragon
          News Portal. Your continued use of the Service after such changes
          constitutes your acceptance of the new Terms and Conditions.
        </p>
        <SectionTitle title="2. Changes to Terms" />
        <p>
          Dragon News reserves the right to modify or revise these Terms and
          Conditions at any time, without notice. Changes to the Terms and
          Conditions will be effective immediately upon posting on the Dragon
          News Portal. Your continued use of the Service after such changes
          constitutes your acceptance of the new Terms and Conditions.
        </p>

        <SectionTitle title="3. User Content" />
        <ol className="list-decimal list-inside">
          <li>
            User Responsibility: Users of the Dragon News Portal may submit
            content, including articles, comments, and other materials ("User
            Content"). You are solely responsible for the User Content you
            submit, and it must comply with these Terms and Conditions.
          </li>
          <li>
            Rights: By submitting User Content, you grant Dragon News a
            worldwide, non-exclusive, royalty-free, and transferable license to
            use, reproduce, distribute, display, and modify the User Content in
            connection with the Service and Dragon News's business operations.
          </li>
          <li>
            Content Guidelines: User Content must not violate any applicable
            laws, infringe on the rights of third parties, or contain any
            offensive, defamatory, or harmful material. Dragon News reserves the
            right to remove or edit User Content at its discretion.
          </li>
        </ol>

        <SectionTitle title="4. Copyright and Intellectual Property" />
        <p>
          <ul className="list-decimal list-inside">
            <li>
              Ownership: All content and materials on the Dragon News Portal,
              including but not limited to text, graphics, logos, images,
              videos, and software, are the property of Dragon News or its
              licensors and are protected by copyright and other intellectual
              property laws.
            </li>
            <li>
              Use of Content: Use of Content: You may not reproduce, distribute,
              modify, or create derivative works from any content on the Dragon
              News Portal without prior written consent from Dragon News.
            </li>
          </ul>
        </p>
        <SectionTitle title="5. Privacy Policy" />
        <p>
          Your use of the Dragon News Portal is subject to our Privacy Policy,
          which outlines how we collect, use, and protect your personal
          information. By using the Service, you consent to the collection and
          use of your data in accordance with our Privacy Policy.
        </p>
        <SectionTitle title="6. Termination" />
        <p>
          Dragon News may, at its discretion, terminate or suspend your access
          to the Service at any time, with or without cause and with or without
          notice.
        </p>
        <SectionTitle title="7. Disclaimer of Warranties" />
        <p>
          The Dragon News Portal is provided on an "as-is" and "as-available"
          basis. Dragon News makes no warranties, express or implied, regarding
          the accuracy, reliability, or availability of the Service.
        </p>
        <SectionTitle title="8. Limitation of Liability" />
        <p>
          {" "}
          Limitation of Liability Dragon News shall not be liable for any
          direct, indirect, incidental, special, consequential, or punitive
          damages arising out of your use or inability to use the Dragon News
          Portal.
        </p>

        <SectionTitle title="9. Governing Law" />

        <p>
          {" "}
          Governing Law These Terms and Conditions are governed by and construed
          in accordance with the laws of [Jurisdiction], without regard to its
          conflict of law principles.
        </p>

        <SectionTitle title="10. Contact Us" />
        <p>
          {" "}
          Contact Us If you have any questions or concerns about these Terms and
          Conditions, please contact us at [contact email]. By using the Dragon
          News Portal, you acknowledge that you have read and understood these
          Terms and Conditions and agree to be bound by them.
        </p>
        <div className="text-center lg:pt-4 link-primary font-bold text-md hover:link">
          <Link to="/register">Go to Register Page</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;
