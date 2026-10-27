export function discussProject(serviceId: string, navigate?: (href: string) => void) {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== "/") {
    navigate?.(`/?service=${encodeURIComponent(serviceId)}#contact`);
    return;
  }
  const url = new URL(window.location.href);
  url.searchParams.set("service", serviceId);
  url.hash = "contact";
  window.history.replaceState(null, "", url);
  window.dispatchEvent(
    new CustomEvent("shivonix:service", { detail: serviceId }),
  );
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => {
    document.getElementById("field-service")?.focus();
  }, 350);
}

export function buildMailto(payload: {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}) {
  const subject = `Project inquiry: ${payload.service}`;
  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Service: ${payload.service}`,
    `Budget: ${payload.budget}`,
    "",
    payload.message,
  ].join("\n");
  return `mailto:contactjyotiiagarwal@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
