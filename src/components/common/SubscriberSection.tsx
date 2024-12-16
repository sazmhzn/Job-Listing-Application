// SubscribeSection.js
import { Button } from "@/components/ui/button";

const SubscribeSection = () => (
  <section className="min-h-[40vh] w-full flex items-center justify-center p-6">
    <article className="bg-blue-600 md:w-4/5 rounded-xl p-4 flex items-center justify-center">
      <div className="p-4 rounded-xl flex flex-col gap-2">
        <header className="text-center">
          <h1 className="md:text-4xl text-white md:w-[25ch] mb-6 text-center md:leading-10 font-semibold">
            New Things Will Always Update Regularly
          </h1>
        </header>
        <div className="bg-white p-2 rounded-lg flex">
          <input
            type="text"
            className="w-full px-2 active:outline-none text-lg rounded-lg"
            placeholder="Enter your email"
          />
          <Button className="p-6">Subscribe</Button>
        </div>
      </div>
    </article>
  </section>
);

export default SubscribeSection;
