import { Link } from "@remix-run/react";

export default function About() {
  return (
    <div className="relative pt-10 hidden sm:block">
      <img src="/assets/logo.png" alt="Hirwa Aldo Logo" />
      <h3 className="text-4xl font-bold mt-4">A - Task Manager</h3>
      <h5 className="uppercase font-light mt-2">A-task manager ldt</h5>
      <p className="font-medium mt-10">
        A-task is a user-friendly project management tool that streamlines daily
        tasks for greater productivity. It's an open-source platform that
        accepts issues and pull requests for continuous development. With its
        sleek interface, A-task is perfect for busy individuals at work or in
        their personal lives.
      </p>
      <div className="absolute bottom-0">
        <span className="block">Contact</span>
        <Link to="me:+250 7903529">hirwaaldo1@gmail | +250 7903529</Link>
      </div>
    </div>
  );
}
