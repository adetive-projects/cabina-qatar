import Link from "next/link";
import { LayoutOne } from "../layouts";
import { BreadcrumbOne } from "../components/Breadcrumb";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import { FaRegMap, FaRegEnvelopeOpen, FaMobileAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { apiUrl } from "../data/api/api";
import cogoToast from "@hasanm95/cogo-toast";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const [contact, setContact] = useState({
    customer_name: "",
    contact_number: "",
    email: "",
    subject: "",
    message: "",
  });
  const { t } = useTranslation();

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();

    if (
      contact.customer_name &&
      contact.contact_number &&
      contact.email &&
      contact.message
    ) {
      try {
        const response = await fetch(`${apiUrl}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });

        const data = await response.json();

        if (data.success) {
          setContact({
            customer_name: "",
            contact_number: "",
            email: "",
            subject: "",
            message: "",
          });
          cogoToast.success(
            "Thank you for contacting us. Our team will contact you shortly",
            { position: "bottom-left" }
          );
        } else {
          console.log("Error:", data.message);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      cogoToast.error("Please fill all the required fields", {
        position: "bottom-left",
      });
    }
  };

  // useEffect(() => {
  //   const addGoogleTranslate = () => {
  //     const googleTranslateScript = document.createElement("script");
  //     googleTranslateScript.type = "text/javascript";
  //     googleTranslateScript.src =
  //       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //     document.body.appendChild(googleTranslateScript);

  //     window.googleTranslateElementInit = () => {
  //       new window.google.translate.TranslateElement(
  //         {
  //           pageLanguage: "en",
  //           includedLanguages: "en,ar",
  //           layout:
  //             window.google.translate.TranslateElement.InlineLayout.SIMPLE,
  //         },
  //         "google_translate_element"
  //       );
  //     };
  //   };

  //   addGoogleTranslate();
  // }, []);
  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle={t("contact.breadcrumb.title")}>
        <ol className="breadcrumb justify-content-md-end align-items-center">
          <li className="breadcrumb-item">
            <Link href="/">{t("contact.breadcrumb.link")}</Link>
          </li>
          <li className="breadcrumb-item active">
            {t("contact.breadcrumb.title")}
          </li>
        </ol>
      </BreadcrumbOne>
      <div className="contact-content space-pt--r100 space-pb--r100">
        {/* <div className="contact-icon-area space-pb--r70">
          <Container>
            <Row>
              <Col xl={4} md={6}>
                <div className="contact-wrap">
                  <div className="contact-wrap__icon">
                    <FaRegMap />
                  </div>
                  <div className="contact-wrap__text">
                    <span>Address</span>
                    <p>123 Street, Old Trafford, London, UK</p>
                  </div>
                </div>
              </Col>
              <Col xl={4} md={6}>
                <div className="contact-wrap">
                  <div className="contact-wrap__icon">
                    <FaRegEnvelopeOpen />
                  </div>
                  <div className="contact-wrap__text">
                    <span>Email Address</span>
                    <a href="mailto:info@sitename.com">info@yourmail.com </a>
                  </div>
                </div>
              </Col>
              <Col xl={4} md={6}>
                <div className="contact-wrap">
                  <div className="contact-wrap__icon">
                    <FaMobileAlt />
                  </div>
                  <div className="contact-wrap__text">
                    <span>Phone</span>
                    <p>+ 457 789 789 65</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div> */}
        <div className="contact-form-map-area">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="heading-s1 space-mb--20">
                  <h2>{t("contact.contact-us.title")}</h2>
                </div>
                <p className="leads">{t("contact.breadcrumb.text")}</p>
                <div className="field-form">
                  <form method="post">
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <input
                          required
                          placeholder={t("contact.contact-us.form.name")}
                          id="first-name"
                          className="form-control"
                          value={contact.customer_name}
                          onChange={handleChange}
                          name="customer_name"
                          type="text"
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <input
                          required
                          placeholder={t("contact.contact-us.form.email")}
                          id="email"
                          className="form-control"
                          onChange={handleChange}
                          value={contact.email}
                          name="email"
                          type="email"
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <input
                          required
                          placeholder={t("contact.contact-us.form.phone")}
                          id="phone"
                          className="form-control"
                          onChange={handleChange}
                          value={contact.contact_number}
                          name="contact_number"
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <input
                          placeholder={t("contact.contact-us.form.subject")}
                          id="subject"
                          className="form-control"
                          onChange={handleChange}
                          value={contact.subject}
                          name="subject"
                        />
                      </div>
                      <div className="mb-3 col-md-12">
                        <textarea
                          required
                          placeholder={t("contact.contact-us.form.message")}
                          id="description"
                          className="form-control"
                          onChange={handleChange}
                          value={contact.message}
                          name="message"
                          rows={6}
                          defaultValue={""}
                        />
                      </div>
                      <div className="col-md-12">
                        <button
                          type="submit"
                          title="Submit Your Message!"
                          className="btn btn-fill-out"
                          id="submitButton"
                          name="submit"
                          value="Submit"
                          onClick={handleSubmitContact}
                        >
                          {t("contact.contact-us.form.submit")}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Col>
              {/* <Col lg={6} className="pt-2 pt-lg-0 mt-4 mt-lg-0">
                <div className="google-map">
                  <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6777.000026107364!2d-74.08304414937152!3d40.83212940017352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f866a80dcc27%3A0x3e3160910d4d5045!2sHoliday%20Inn%20Express%20%26%20Suites%20Meadowlands%20Area!5e0!3m2!1sen!2sbd!4v1581852597883!5m2!1sen!2sbd"
                    allowFullScreen
                  />
                </div>
              </Col> */}
            </Row>

            <Row>
              <Col md={12} className="space-pt--r100 mb-4">
                <div className="heading-s1  space-mb--20 pt-4 text-start">
                  <h2>{t("contact.faq.title")}</h2>
                </div>
                <div className="heading-s2 mb-3 mb-md-5 pt-4">
                  <h3>{t("contact.faq.subtitle-one")}</h3>
                </div>
                <Accordion defaultActiveKey="" className="faq-accordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      {t("contact.faq.question-one")}
                      <IoMdAdd />
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{t("contact.faq.answer-one")}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      {t("contact.faq.question-two")}
                      <IoMdAdd />
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{t("contact.faq.answer-two.point-one")}</p>
                      <ul>
                        <li>{t("contact.faq.answer-two.point-two")}</li>
                        <li>{t("contact.faq.answer-two.point-three")}</li>
                        <li>{t("contact.faq.answer-two.point-four")}</li>
                        <li>
                          {t("contact.faq.answer-two.point-five")}{" "}
                          <Link href="tel:+974 4433 7000">+974 4433 7000</Link>{" "}
                        </li>
                        <li>
                          {t("contact.faq.answer-two.point-six")} +974 4433 7100
                        </li>
                        <li>
                          {t("contact.faq.answer-two.point-seven")}{" "}
                          <Link href="mailto:general@tadmur-trading.com">
                            general@tadmur-trading.com
                          </Link>
                        </li>
                        <li>{t("contact.faq.answer-two.point-eight")}</li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="heading-s2 mb-3 mb-md-5 pt-4">
                  <h3>{t("contact.faq.subtitle-two")}</h3>
                </div>
                <Accordion defaultActiveKey="" className="faq-accordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      {t("contact.faq.question-three")}
                      <IoMdAdd />
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{t("contact.faq.answer-three.point-one")}</p>
                      <p>{t("contact.faq.answer-three.point-two")}</p>
                      <p>{t("contact.faq.answer-three.point-three")}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="heading-s2 mb-3 mb-md-5 pt-4">
                  <h3>{t("contact.faq.subtitle-three")}</h3>
                </div>
                <Accordion defaultActiveKey="" className="faq-accordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      {t("contact.faq.question-four")}
                      <IoMdAdd />
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{t("contact.faq.answer-four")}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      {t("contact.faq.question-five")}
                      <IoMdAdd />
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{t("contact.faq.answer-five.point-one")}</p>
                      <p>{t("contact.faq.answer-five.point-two")}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      {t("contact.faq.question-six")}
                      <IoMdAdd />
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{t("contact.faq.answer-six.point-one")}</p>
                      <p>{t("contact.faq.answer-six.point-two")}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      {t("contact.faq.question-seven")}
                      <IoMdAdd />
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{t("contact.faq.answer-seven")}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </LayoutOne>
  );
};

export default ContactUs;
