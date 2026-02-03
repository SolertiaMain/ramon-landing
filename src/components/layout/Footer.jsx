import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t py-10">
      <Container className="text-sm opacity-70">
        © {new Date().getFullYear()} Ramon. Footer en construcción.
      </Container>
    </footer>
  );
}
