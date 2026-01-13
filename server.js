import express from 'express';
import cors from 'cors';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Configuration CORS pour production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://reouven-sarah.com', 'https://www.reouven-sarah.com']
    : '*',
  credentials: true
}));
app.use(express.json());

const EXCEL_FILE = path.join(__dirname, 'rsvp-reponses.xlsx');

// Fonction pour créer ou mettre à jour le fichier Excel
async function updateExcelFile(data) {
  let workbook = new ExcelJS.Workbook();
  let worksheet;

  // Vérifier si le fichier existe
  if (fs.existsSync(EXCEL_FILE)) {
    await workbook.xlsx.readFile(EXCEL_FILE);
    worksheet = workbook.getWorksheet('Réponses') || workbook.addWorksheet('Réponses');
  } else {
    worksheet = workbook.addWorksheet('Réponses');
    
    // En-têtes avec style
    const headers = ['Date', 'Heure', 'Prénom', 'Nom', 'Présence', 'Houppa', 'Soirée', 'Adultes', 'Enfants', 'Total Invités', 'Message'];
    const headerRow = worksheet.addRow(headers);
    
    // Style des en-têtes
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFB8860B' } // Or
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    
    // Largeur des colonnes
    worksheet.getColumn(1).width = 15; // Date
    worksheet.getColumn(2).width = 10; // Heure
    worksheet.getColumn(3).width = 20; // Prénom
    worksheet.getColumn(4).width = 20; // Nom
    worksheet.getColumn(5).width = 15; // Présence
    worksheet.getColumn(6).width = 12; // Houppa
    worksheet.getColumn(7).width = 12; // Soirée
    worksheet.getColumn(8).width = 12; // Adultes
    worksheet.getColumn(9).width = 12; // Enfants
    worksheet.getColumn(10).width = 15; // Total
    worksheet.getColumn(11).width = 50; // Message
  }

  // Ajouter la nouvelle réponse
  const now = new Date();
  const date = now.toLocaleDateString('fr-FR');
  const time = now.toLocaleTimeString('fr-FR');
  const total = data.presence === 'oui' ? (parseInt(data.adultes) + parseInt(data.enfants)) : 0;
  const presenceText = data.presence === 'oui' ? 'Oui' : 'Non';
  const houppaText = data.houppa ? 'Oui' : 'Non';
  const soireeText = data.soiree ? 'Oui' : 'Non';

  const newRow = worksheet.addRow([
    date,
    time,
    data.prenom,
    data.nom,
    presenceText,
    houppaText,
    soireeText,
    data.presence === 'oui' ? parseInt(data.adultes) : 0,
    data.presence === 'oui' ? parseInt(data.enfants) : 0,
    total,
    data.message || ''
  ]);

  // Style des lignes de données
  newRow.alignment = { vertical: 'middle', horizontal: 'left' };
  newRow.getCell(5).alignment = { vertical: 'middle', horizontal: 'center' }; // Présence
  newRow.getCell(6).alignment = { vertical: 'middle', horizontal: 'center' }; // Houppa
  newRow.getCell(7).alignment = { vertical: 'middle', horizontal: 'center' }; // Soirée
  newRow.getCell(8).alignment = { vertical: 'middle', horizontal: 'center' }; // Adultes
  newRow.getCell(9).alignment = { vertical: 'middle', horizontal: 'center' }; // Enfants
  newRow.getCell(10).alignment = { vertical: 'middle', horizontal: 'center' }; // Total

  // Couleur selon la présence
  if (data.presence === 'non') {
    newRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF5F5F5' } // Gris clair
    };
  }

  // Ajouter bordures
  newRow.eachCell((cell) => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

  // Créer ou mettre à jour la feuille de résumé
  let summarySheet = workbook.getWorksheet('Résumé');
  if (!summarySheet) {
    summarySheet = workbook.addWorksheet('Résumé');
  } else {
    summarySheet.spliceRows(1, summarySheet.rowCount);
  }

  // Calculer les totaux
  let totalAdultes = 0;
  let totalEnfants = 0;
  let totalPersonnes = 0;
  let nombreFamilles = 0;
  let nombrePresents = 0;
  let nombreAbsents = 0;
  let totalHouppa = 0;
  let totalSoiree = 0;
  let totalAdultesHouppa = 0;
  let totalEnfantsHouppa = 0;
  let totalAdultesSoiree = 0;
  let totalEnfantsSoiree = 0;

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) { // Skip header
      const presence = row.getCell(5).value;
      const houppa = row.getCell(6).value;
      const soiree = row.getCell(7).value;
      const adultes = row.getCell(8).value || 0;
      const enfants = row.getCell(9).value || 0;
      
      nombreFamilles++;
      
      if (presence === 'Oui') {
        nombrePresents++;
        totalAdultes += adultes;
        totalEnfants += enfants;
        totalPersonnes += (adultes + enfants);
        
        if (houppa === 'Oui') {
          totalHouppa++;
          totalAdultesHouppa += adultes;
          totalEnfantsHouppa += enfants;
        }
        
        if (soiree === 'Oui') {
          totalSoiree++;
          totalAdultesSoiree += adultes;
          totalEnfantsSoiree += enfants;
        }
      } else {
        nombreAbsents++;
      }
    }
  });

  // Créer le résumé avec style
  summarySheet.addRow(['RÉSUMÉ DES INVITATIONS', '']);
  summarySheet.addRow(['', '']);

  // Titre
  const titleRow = summarySheet.getRow(1);
  titleRow.font = { bold: true, size: 16, color: { argb: 'FFB8860B' } };
  titleRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF7E7CE' } // Crème
  };

  // Section générale
  summarySheet.addRow(['GÉNÉRAL', '']);
  summarySheet.addRow(['Nombre de familles', nombreFamilles]);
  summarySheet.addRow(['Familles présentes', nombrePresents]);
  summarySheet.addRow(['Familles absentes', nombreAbsents]);
  summarySheet.addRow(['', '']);
  
  // Section totaux
  summarySheet.addRow(['TOTAUX GÉNÉRAUX', '']);
  summarySheet.addRow(['Total adultes', totalAdultes]);
  summarySheet.addRow(['Total enfants', totalEnfants]);
  summarySheet.addRow(['TOTAL INVITÉS', totalPersonnes]);
  summarySheet.addRow(['', '']);
  
  // Section Houppa
  summarySheet.addRow(['HOUPPA', '']);
  summarySheet.addRow(['Familles présentes à la Houppa', totalHouppa]);
  summarySheet.addRow(['Adultes à la Houppa', totalAdultesHouppa]);
  summarySheet.addRow(['Enfants à la Houppa', totalEnfantsHouppa]);
  summarySheet.addRow(['Total invités Houppa', totalAdultesHouppa + totalEnfantsHouppa]);
  summarySheet.addRow(['', '']);
  
  // Section Soirée
  summarySheet.addRow(['SOIRÉE', '']);
  summarySheet.addRow(['Familles présentes à la soirée', totalSoiree]);
  summarySheet.addRow(['Adultes à la soirée', totalAdultesSoiree]);
  summarySheet.addRow(['Enfants à la soirée', totalEnfantsSoiree]);
  summarySheet.addRow(['Total invités Soirée', totalAdultesSoiree + totalEnfantsSoiree]);

  // Style du résumé - Sections
  const sectionRows = [3, 9, 14, 20]; // Lignes des titres de section
  sectionRows.forEach(rowNum => {
    const row = summarySheet.getRow(rowNum);
    row.font = { bold: true, size: 12, color: { argb: 'FFB8860B' } };
    row.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF7E7CE' }
    };
  });

  // Style des totaux principaux
  summarySheet.getRow(12).font = { bold: true, size: 14, color: { argb: 'FFB8860B' } };
  summarySheet.getRow(12).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFB8860B' }
  };
  summarySheet.getRow(12).font.color = { argb: 'FFFFFFFF' };
  summarySheet.getRow(12).alignment = { vertical: 'middle', horizontal: 'center' };
  
  // Style des totaux Houppa et Soirée
  summarySheet.getRow(17).font = { bold: true, size: 12 };
  summarySheet.getRow(23).font = { bold: true, size: 12 };

  // Largeur des colonnes du résumé
  summarySheet.getColumn(1).width = 25;
  summarySheet.getColumn(2).width = 20;

  // Ajouter bordures au résumé (toutes les lignes de données)
  for (let i = 3; i <= summarySheet.rowCount; i++) {
    summarySheet.getRow(i).eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  }
  
  // Bordures épaisses pour les totaux principaux
  summarySheet.getRow(12).eachCell((cell) => {
    cell.border = {
      top: { style: 'medium' },
      left: { style: 'medium' },
      bottom: { style: 'medium' },
      right: { style: 'medium' }
    };
  });

  await workbook.xlsx.writeFile(EXCEL_FILE);
  
  return {
    totalAdultes,
    totalEnfants,
    totalPersonnes,
    nombreFamilles
  };
}

// Endpoint pour recevoir les réponses RSVP
app.post('/api/rsvp', async (req, res) => {
  try {
    const { prenom, nom, adultes, enfants, message } = req.body;

    // Validation
    if (!prenom || !nom || !adultes || enfants === undefined || !req.body.presence) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    // Validation si présent : au moins une option (Houppa ou Soirée) doit être cochée
    if (req.body.presence === 'oui' && !req.body.houppa && !req.body.soiree) {
      return res.status(400).json({ error: 'Veuillez sélectionner au moins la Houppa ou la Soirée' });
    }

    const summary = await updateExcelFile({
      prenom: prenom.trim(),
      nom: nom.trim(),
      adultes: parseInt(adultes),
      enfants: parseInt(enfants),
      message: message ? message.trim() : ''
    });

    res.json({
      success: true,
      message: 'Réponse enregistrée avec succès',
      summary
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

// Endpoint pour télécharger le fichier Excel
app.get('/api/rsvp/download', (req, res) => {
  if (!fs.existsSync(EXCEL_FILE)) {
    return res.status(404).json({ error: 'Aucun fichier trouvé' });
  }
  res.download(EXCEL_FILE, 'rsvp-reponses.xlsx');
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
  console.log(`📊 Fichier Excel: ${EXCEL_FILE}`);
});
