import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { FaRegComments, FaCalendarAlt } from "react-icons/fa";
import Swiper, { SwiperSlide } from "../swiper";

const params = {
  loop: false,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  }
};

const BlogPostGridWrapper = ({ columns }) => {
  return (
    <Row>
      <Col xl={columns && columns == 4 ? 3 : 4} md={6}>
        <div className="blog-post">
          <div className="blog-post__image">
            <Link href="/blog/post-left-sidebar">
              <img
                src="/assets/images/blog/blog_small_img1.jpg"
                alt="blog_small_img1"
              />
            </Link>
          </div>
          <div className="blog-post__content">
            <div className="blog-text">
              <h6 className="blog-title">
                <Link href="/blog/post-left-sidebar">
                  But I must explain to you how all this mistaken idea
                </Link>
              </h6>
              <ul className="blog-meta">
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaCalendarAlt />April 14, 2021
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaRegComments />10
                  </Link>
                </li>
              </ul>
              <p>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col xl={columns && columns == 4 ? 3 : 4} md={6}>
        <div className="blog-post">
          <div className="blog-post__image">
            <Link href="/blog/post-left-sidebar">

              <img
                src="/assets/images/blog/blog_small_img2.jpg"
                alt="blog_small_img1"
              />

            </Link>
          </div>
          <div className="blog-post__content">
            <div className="blog-text">
              <h6 className="blog-title">
                <Link href="/blog/post-left-sidebar">
                  On the other hand we provide denounce with righteous
                </Link>
              </h6>
              <ul className="blog-meta">
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaCalendarAlt />April 14, 2021
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaRegComments />10
                  </Link>
                </li>
              </ul>
              <p>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col xl={columns && columns == 4 ? 3 : 4} md={6}>
        <div className="blog-post">
          <div className="blog-post__image">
            <Link href="/blog/post-left-sidebar">

              <img
                src="/assets/images/blog/blog_small_img3.jpg"
                alt="blog_small_img1"
              />

            </Link>
          </div>
          <div className="blog-post__content">
            <div className="blog-text">
              <h6 className="blog-title">
                <Link href="/blog/post-left-sidebar">
                  Why is a ticket to Lagos so expensive?
                </Link>
              </h6>
              <ul className="blog-meta">
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaCalendarAlt />April 14, 2021
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaRegComments />10
                  </Link>
                </li>
              </ul>
              <p>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col xl={columns && columns == 4 ? 3 : 4} md={6}>
        <div className="blog-post">
          <div className="blog-post__image">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://player.vimeo.com/video/132464682?byline=0&portrait=0"
                width="540"
                height="360"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="blog-post__content">
            <div className="blog-text">
              <h6 className="blog-title">
                <Link href="/blog/post-left-sidebar">
                  But I must explain to you how all this mistaken idea
                </Link>
              </h6>
              <ul className="blog-meta">
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaCalendarAlt />April 14, 2021
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaRegComments />10
                  </Link>
                </li>
              </ul>
              <p>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col xl={columns && columns == 4 ? 3 : 4} md={6}>
        <div className="blog-post">
          <div className="blog-post__image">
            <Link href="/blog/post-left-sidebar">
              <img
                src="/assets/images/blog/blog_small_img5.jpg"
                alt="blog_small_img1"
              />
            </Link>
          </div>
          <div className="blog-post__content">
            <div className="blog-text">
              <h6 className="blog-title">
                <Link href="/blog/post-left-sidebar">
                  But I must explain to you how all this mistaken idea
                </Link>
              </h6>
              <ul className="blog-meta">
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaCalendarAlt />April 14, 2021
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaRegComments />10
                  </Link>
                </li>
              </ul>
              <p>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col xl={columns && columns == 4 ? 3 : 4} md={6}>
        <div className="blog-post">
          <div className="blog-post__image">
            <div className="ratio ratio-16x9">
              <iframe
                width="540"
                height="360"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/118951274&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              ></iframe>
            </div>
          </div>
          <div className="blog-post__content">
            <div className="blog-text">
              <h6 className="blog-title">
                <Link href="/blog/post-left-sidebar">
                  But I must explain to you how all this mistaken idea
                </Link>
              </h6>
              <ul className="blog-meta">
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaCalendarAlt />April 14, 2021
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaRegComments />10
                  </Link>
                </li>
              </ul>
              <p>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col xl={columns && columns == 4 ? 3 : 4} md={6}>
        <div className="blog-post">
          <div className="blog-post__image">
            <Link href="/blog/post-left-sidebar">

              <img
                src="/assets/images/blog/blog_small_img6.jpg"
                alt="blog_small_img1"
              />

            </Link>
          </div>
          <div className="blog-post__content">
            <div className="blog-text">
              <h6 className="blog-title">
                <Link href="/blog/post-left-sidebar">
                  But I must explain to you how all this mistaken idea
                </Link>
              </h6>
              <ul className="blog-meta">
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaCalendarAlt />April 14, 2021
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaRegComments />10
                  </Link>
                </li>
              </ul>
              <p>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col xl={columns && columns == 4 ? 3 : 4} md={6}>
        <div className="blog-post">
          <div className="blog-post__image">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/7e90gBu4pas"
                width="540"
                height="360"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="blog-post__content">
            <div className="blog-text">
              <h6 className="blog-title">
                <Link href="/blog/post-left-sidebar">
                  But I must explain to you how all this mistaken idea
                </Link>
              </h6>
              <ul className="blog-meta">
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaCalendarAlt />April 14, 2021
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaRegComments />10
                  </Link>
                </li>
              </ul>
              <p>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col xl={columns && columns == 4 ? 3 : 4} md={6}>
        <div className="blog-post">
          <div className="blog-post__image">
            <Swiper options={params}>
              <SwiperSlide className="item">
                <Link href="/blog/post-left-sidebar">
                  <img
                    src="/assets/images/blog/blog_small_img4.jpg"
                    alt="blog_small_img1"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="item">
                <Link href="/blog/post-left-sidebar">
                  <img
                    src="/assets/images/blog/blog_small_img5.jpg"
                    alt="blog_small_img1"
                  />
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="blog-post__content">
            <div className="blog-text">
              <h6 className="blog-title">
                <Link href="/blog/post-left-sidebar">
                  But I must explain to you how all this mistaken idea
                </Link>
              </h6>
              <ul className="blog-meta">
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaCalendarAlt />April 14, 2021
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-left-sidebar">

                    <FaRegComments />10
                  </Link>
                </li>
              </ul>
              <p>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there isn't anything embarrassing hidden in the middle of
                text
              </p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default BlogPostGridWrapper;
