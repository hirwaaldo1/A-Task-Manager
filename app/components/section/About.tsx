import { Link } from "@remix-run/react";

export default function About() {
  return (
    <div className="relative pt-10 hidden sm:block">
      <img src="/assets/logo.png" alt="Hirwa Aldo Logo" />
      <h3 className="text-4xl font-bold mt-4">A - Task Manager</h3>
      <h5 className="uppercase font-light mt-2">A-task manager ldt</h5>
      <p className="font-medium mt-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus com- modo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
      <div className="absolute bottom-0">
        <span className="block">Contact</span>
        <Link to="me:+250 7903529">hirwaaldo1@gmail | +250 7903529</Link>
      </div>
    </div>
  );
}
