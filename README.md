# Forma Bath Co. — Luxury Bathroom Remodeling & 3D Interactive Transformation

A premium, single-page web experience built for high-ticket bathroom renovation studios. Features an architectural editorial design system, a cinematic 201-frame scroll-linked canvas sequence, an interactive before-and-after comparison slider, transparent process & investment tiers, and built-in lead automation for **n8n** and **Activepieces**.

![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)

---

## ✨ Features

* **Cinematic 3-Act Scroll Sequence (201 Frames)**:
  * Native HTML5 Canvas rendering with `devicePixelRatio` scaling, concurrency-controlled background preloading, and zero layout shift.
  * Three uninterrupted storytelling acts (*The Vision*, *The Craft*, *The Result*) with an interactive `01 / 03` timeline tracker.
* **Interactive Before & After Comparison Slider**:
  * Seamless draggable divider with mouse, touch, and keyboard arrow controls.
  * Side-by-side comparison between the original outdated space and the completed travertine luxury suite.
* **Curated Design Style Selector**:
  * Instant previews for *The Travertine Primary Suite*, *The Japandi White Oak Bath*, and *The Calacatta Marble Sanctuary*.
  * 1-click "Plan This Design" action that auto-selects scope in the consultation request form.
* **Transparent 3-Step Process & Upfront Investment Tiers**:
  * Clear timeline (*3D Scan & Design → Fixed-Price Contract → 3-Week White-Glove Construction*).
  * Upfront investment brackets (*Guest Refresh*, *Full Master*, *Architectural Spa*).
* **High-Converting Estimate Request Form**:
  * Real-time client-side and server-side validation.
  * Paired with verified homeowner trust badges, 10-year craftsmanship warranty, and 5.0 ★ social proof.
* **Backend Automation & Webhook Integration (n8n / Activepieces)**:
  * Persistent local storage in `data/leads.json`.
  * Instant webhook event dispatching on every consultation request (`lead.submitted`).
  * Built-in diagnostic endpoint (`/api/webhook-test`) for testing automation flows.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router + Turbopack)
* **Frontend**: React 19, TypeScript
* **Styling**: Tailwind CSS v4, Vanilla CSS Design System
* **Typography**: Cormorant Garamond (Editorial Serif), Plus Jakarta Sans (Clean Sans)
* **Animation & Canvas**: HTML5 2D Canvas with RequestAnimationFrame LERP Interpolation
* **Backend API**: Next.js Route Handlers (`/api/estimate`, `/api/webhook-test`)
* **Automation Ready**: Webhook support for n8n, Activepieces, Zapier, Make, and GoHighLevel

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kashyap142003/bathroom_rebuilder_3d_website.git
cd bathroom_rebuilder_3d_website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment (Optional)

Create a `.env.local` file to connect your automation webhook:

```env
LEAD_WEBHOOK_URL=https://cloud.activepieces.com/api/v1/webhooks/your-webhook-id
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live website.

---

## ⚙️ Webhook Automation Payload

When a homeowner submits a consultation request, the server sends this JSON payload to your webhook:

```json
{
  "event": "lead.submitted",
  "source": "Forma Bath Co. Landing Page",
  "timestamp": "2026-10-10T18:30:00Z",
  "data": {
    "lead": {
      "id": "lead_1791628629671_gwfy1",
      "name": "Sarah Jenkins",
      "email": "sarah@example.com",
      "phone": "(555) 234-5678",
      "projectType": "Full Master Bath Rebuild & Millwork",
      "budgetRange": "$26,000 – $44,000 (Full Master)",
      "zipCode": "90210",
      "description": "Curbless walk-in shower with custom fluted vanity."
    },
    "notificationSummary": "🚀 New Lead: Sarah Jenkins | Project: Full Master Bath Rebuild..."
  }
}
```

---

## 📄 License

This project is licensed under the MIT License.
