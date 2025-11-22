export async function guardarTicketBD(ventas) {
    await fetch("/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ventas)
    });
}
