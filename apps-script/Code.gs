/**
 * L'Atelier 166 : réception du formulaire d'inscription.
 *
 * Projet Apps Script autonome « Atelier 166 · Inscriptions » (compte laguitarisation@gmail.com),
 * déployé en application Web. Chaque envoi ajoute une ligne dans l'onglet ONGLET du
 * Google Sheet « Élèves » et envoie un mail à MAIL_NOTIF, depuis l'alias
 * samuel@guitarisation.fr s'il est configuré dans Gmail (sinon depuis le compte du script).
 */

const SHEET_ID = "1snWJlo0vnNSY3YUV6SCH1JHjIEfsNZozZpQ0y88txHk"; // Google Sheet « Élèves »
const ONGLET = "Atelier 166";
const MAIL_NOTIF = "samuel@guitarisation.fr";

const COLONNES = [
  ["date", "Date d'envoi"],
  ["prenom", "Prénom"],
  ["nom", "Nom"],
  ["email", "E-mail"],
  ["telephone", "Téléphone"],
  ["instrument", "Instrument(s)"],
  ["experience", "Joue depuis"],
  ["groupe", "Déjà joué avec d'autres"],
  ["accords", "Accords / morceaux connus"],
  ["envies", "Envies"],
  ["dispo", "Dispo jeudi 20 h"],
  ["materiel", "A son instrument"],
  ["source", "Connu par"],
  ["message", "Message"],
  ["statut", "Statut"],
];

function doPost(e) {
  const p = e.parameters || {};
  const val = (k) => (p[k] || []).join(", ").trim().slice(0, 2000);

  // Piège à robots rempli, ou champs obligatoires absents : on ignore sans rien écrire.
  if (val("site") || !val("email") || !val("prenom")) return repondre({ ok: false });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const feuille = onglet_();
    const donnees = {};
    COLONNES.forEach(([k]) => (donnees[k] = proteger_(val(k))));
    donnees.date = new Date();
    donnees.statut = "Pré-inscrit";
    feuille.appendRow(COLONNES.map(([k]) => donnees[k]));
    notifier_(donnees, feuille.getParent().getUrl());
  } finally {
    lock.releaseLock();
  }
  return repondre({ ok: true });
}

// Permet de vérifier que le déploiement répond (ouvrir l'URL dans le navigateur).
function doGet() {
  return repondre({ ok: true, service: "Atelier 166" });
}

function onglet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let f = ss.getSheetByName(ONGLET);
  if (!f) {
    f = ss.insertSheet(ONGLET);
    f.appendRow(COLONNES.map(([, titre]) => titre));
    f.getRange(1, 1, 1, COLONNES.length).setFontWeight("bold");
    f.setFrozenRows(1);
  }
  return f;
}

// Empêche qu'une réponse commençant par = + - @ soit interprétée comme une formule.
function proteger_(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function notifier_(d, urlSheet) {
  const lignes = COLONNES
    .filter(([k]) => k !== "date" && k !== "statut" && d[k])
    .map(([k, titre]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b5f52">${titre}</td><td style="padding:4px 0">${echapper_(d[k])}</td></tr>`)
    .join("");
  const total = SpreadsheetApp.openById(SHEET_ID).getSheetByName(ONGLET).getLastRow() - 1;
  const html =
    `<p>Nouvelle demande de séance d'essai (${total} inscrit${total > 1 ? "s" : ""} au total).</p>` +
    `<table style="font-family:Arial,sans-serif;font-size:14px">${lignes}</table>` +
    `<p><a href="${urlSheet}">Ouvrir le Google Sheet</a></p>`;
  const options = { htmlBody: html, replyTo: d.email, name: "L'Atelier 166" };
  if (GmailApp.getAliases().indexOf(MAIL_NOTIF) !== -1) options.from = MAIL_NOTIF;
  GmailApp.sendEmail(MAIL_NOTIF, `Atelier 166 : nouvelle inscription de ${d.prenom} ${d.nom}`, "", options);
}

function echapper_(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function repondre(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Lancer une fois à la main depuis l'éditeur pour autoriser le script et tester le mail.
// Penser à supprimer ensuite la ligne « Test » dans le Sheet.
function testerInscription() {
  doPost({ parameters: { prenom: ["Test"], nom: ["Atelier"], email: [MAIL_NOTIF], instrument: ["Guitare acoustique"], dispo: ["Oui, toutes les semaines"] } });
}
