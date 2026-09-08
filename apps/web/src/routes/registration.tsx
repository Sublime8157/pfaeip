import { createFileRoute } from "@tanstack/react-router";
import { RegistrationForm } from "../features/auth/RegistrationForm";

export const Route = createFileRoute("/registration")({
  component: RegistrationForm,
});
