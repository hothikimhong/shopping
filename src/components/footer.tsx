import Link from "next/link";
import { Container } from "./ui/container";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="border-t bg-accent/30 py-16 dark:bg-secondary/20">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-6">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tighter text-primary">
              AURELIA
            </Link>
            <p className="text-sm leading-relaxed text-muted">
              Experience the pinnacle of luxury fashion. Curated collections for the modern individual who values timeless elegance and quality.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted hover:text-primary"><FaInstagram size={20} /></Link>
              <Link href="#" className="text-muted hover:text-primary"><FaFacebook size={20} /></Link>
              <Link href="#" className="text-muted hover:text-primary"><FaTwitter size={20} /></Link>
              <Link href="#" className="text-muted hover:text-primary"><FaYoutube size={20} /></Link>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest">Shop</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted">
              <li><Link href="/new" className="hover:text-primary">New Arrivals</Link></li>
              <li><Link href="/category/men" className="hover:text-primary">Men's Collection</Link></li>
              <li><Link href="/category/women" className="hover:text-primary">Women's Collection</Link></li>
              <li><Link href="/category/accessories" className="hover:text-primary">Accessories</Link></li>
              <li><Link href="/sale" className="hover:text-primary">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest">Customer Service</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted">
              <li><Link href="#" className="hover:text-primary">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-primary">Size Guide</Link></li>
              <li><Link href="#" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest">Newsletter</h4>
            <p className="mb-6 text-sm text-muted">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-b border-muted bg-transparent pb-2 text-sm outline-none focus:border-primary"
              />
              <button className="text-left text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t pt-8 text-center text-xs text-muted">
          <p>© {new Date().getFullYear()} AURELIA Fashion. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
