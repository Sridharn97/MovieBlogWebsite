import { notFound } from 'next/navigation';

const defaultBlogs = [
  {
    slug: 'nobitas-dinosaur-2006',
    title: "🦕 Nobita's Dinosaur 2006",
    image: "/images/nobitas-dinosaur.jpg",
    content: "Nobita hatches a dinosaur and sets off on a heartwarming adventure to return it to its time."
  },
  {
    slug: 'stand-by-me-doraemon',
    title: "👫 Stand By Me Doraemon",
    image: "/images/stand-by-me.jpg",
    content: "A 3D retelling of Doraemon's mission to help Nobita find confidence and love."
  },
  {
    slug: 'nobitas-little-star-wars',
    title: "🚀 Nobita's Little Star Wars",
    image: "/images/little-star-wars.jpg",
    content: "Nobita and friends help tiny alien rebels in an interstellar war of justice."
  },
  {
    slug: 'great-adventure-into-the-underworld',
    title: "🌌 New Great Adventure into the Underworld",
    image: "/images/underworld.jpg",
    content: "A magical quest to save the underworld from an evil invasion."
  },
  {
    slug: 'nobita-and-the-steel-troops',
    title: "🤖 Nobita and the Steel Troops",
    image: "/images/steel-troops.jpg",
    content: "Robots from another world threaten Earth, and Nobita must stop them."
  },
  {
    slug: 'kingdom-of-clouds',
    title: "☁️ Kingdom of Clouds",
    image: "/images/kingdom-of-clouds.jpg",
    content: "A sky-high journey into a world above the clouds, filled with secrets and wonder."
  },
  {
    slug: 'secret-gadget-museum',
    title: "🔧 Secret Gadget Museum",
    image: "/images/secret-gadget-museum.jpg",
    content: "Doraemon's gadgets are stolen, sparking a mystery adventure in a futuristic museum."
  },
  {
    slug: 'legend-of-the-sun-king',
    title: "🌞 Legend of the Sun King",
    image: "/images/sun-king.jpg",
    content: "Nobita is mistaken for a prince in an ancient kingdom with a mysterious curse."
  },
  {
    slug: 'great-adventure-in-the-antarctic',
    title: "❄️ Great Adventure in the Antarctic",
    image: "/images/antarctica.jpg",
    content: "A chilling expedition into Antarctica unveils ancient secrets and hidden threats."
  },
  {
    slug: 'birth-of-japan',
    title: "🏯 Birth of Japan",
    image: "/images/birth-of-japan.jpg",
    content: "Nobita and friends travel to the origins of Japan in this cultural time-travel epic."
  },
  {
    slug: 'nobita-and-the-windmasters',
    title: "🌬️ Nobita and the Windmasters",
    image: "/images/windmasters.jpg",
    content: "The gang enters a world ruled by wind spirits and faces off against an ancient evil."
  },
  {
    slug: 'drifts-in-the-universe',
    title: "🌠 Drifts in the Universe",
    image: "/images/universe-drift.jpg",
    content: "A space adventure where Nobita and team drift into the unknown corners of the universe."
  }
];

export async function generateStaticParams() {
  return defaultBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const blog = defaultBlogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.title,
    description: blog.content,
  };
}

export default function BlogDetails({ params }) {
  const blog = defaultBlogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} style={{ maxWidth: '100%', height: 'auto' }} />
      <p>{blog.content}</p>
    </div>
  );
}