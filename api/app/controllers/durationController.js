const moment = require('moment');
moment.locale('fr');
const Duration = require('../models/duration');
const strRandom = require('../helper');

const durationController = {

	getAllDuration: async (req, res) => {
		try {
			const durations = await Duration.findAll({
				include: ['review']
			});
			res.json(durations);
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	getOneDuration: async (req, res) => {
		try {
			const durationId = req.params.id;
			const duration = await Duration.findByPk(durationId);
			if (duration) {
				res.json(duration);
			} else {
				res.status(404).send('Pas de période avec l\'id ' + durationId);
			}

		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	createDuration: async (req, res) => {
		try {

			const departureDate = moment(req.body.departureDate).add(1, "days");
			const returnDate = moment(req.body.returnDate).add(1, "days");

			// Tableau qui va stocker toutes les dates comprises entre la date de départ et celle de retour 
			let dateArr = [];

			let start = new Date(departureDate);
			let end = new Date(returnDate);

			// Boucle qui permet d'obtenir toutes les dates comprises entre la date de départ et celle de retour
			while (start < end) {
				dateArr.push(moment(start).format("YYYY-MM-DD"));
				let newDate = start.setDate(start.getDate() + 1);
				start = new Date(newDate);
			}

			const daysIncluded = dateArr.filter(date => date !== dateArr[0])

			// Calcul du nombre de jours pour la réservation
			const daysNumber = returnDate.diff(departureDate, 'days') + 1;

			// Envoi des données par le client
			const { firstname, lastname, phone } = req.body;


			// Génération du code qui sera nécessaire pour que le client puisse modifier ou supprimer sa réservation

			const code = strRandom({
				includeUpperCase: true,
				includeNumbers: true,
				length: 6,
				startsWithLowerCase: true
			});

			// Test présence paramètres
			const bodyErrors = [];

			// Pas besoin d'erreur sur la date de départ qui est par défaut à la date de la réservation
			if (!returnDate) {
				bodyErrors.push('Vous devez sélectionner une date de retour');
			}

			if (!firstname) {
				bodyErrors.push('Vous devez indiquer votre prénom');
			}

			if (!lastname) {
				bodyErrors.push('Vous devez indiquer votre nom');
			}

			if (!phone) {
				bodyErrors.push('Vous devez indiquer un numéro de téléphone afin que nous puissions vous joindre si nécessaire');
			}

			if (bodyErrors.length) {
				// Si on a une erreur
				res.status(400).json(bodyErrors);
			} else {
				let newDuration = Duration.build({
					departureDate,
					returnDate,
					daysIncluded,
					daysNumber,
					firstname,
					lastname,
					phone,
					code
				});
				await newDuration.save();
				res.json(newDuration);
			}

		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	modifyDuration: async (req, res) => {
		try {
			const durationId = req.params.id;
			const duration = await Duration.findByPk(durationId);
			if (!duration) {
				res.status(404).send('Pas de période avec l\'id ' + durationId);
			} else {

				const newDepartureDate = moment(req.body.newDepartureDate).add(1, "days");
				const newReturnDate = moment(req.body.newReturnDate).add(1, "days");

				// Tableau qui va stocker toutes les dates comprises entre la date de départ et celle de retour 
				let dateArr = [];

				let start = new Date(newDepartureDate);
				let end = new Date(newReturnDate);

				// Boucle qui permet d'obtenir toutes les dates comprises entre la date de départ et celle de retour
				while (start < end) {
					dateArr.push(moment(start).format("YYYY-MM-DD"));
					let newDate = start.setDate(start.getDate() + 1);
					start = new Date(newDate);
				}

				const daysIncluded = dateArr.filter(date => date !== dateArr[0])

				const daysNumber = newReturnDate.diff(newDepartureDate, 'days') + 1;

				// Envoi des données par le client
				const { firstname, lastname, phone } = req.body;

				// On ne change que les paramètres présents
				if (newDepartureDate) {
					duration.departureDate = newDepartureDate;
				}

				if (newReturnDate) {
					duration.returnDate = newReturnDate;
				}

				if (daysIncluded) {
					duration.daysIncluded = daysIncluded;
				}

				if (daysNumber) {
					duration.daysNumber = daysNumber;
				}

				if (firstname) {
					duration.firstname = firstname;
				}
				if (lastname) {
					duration.lastname = lastname;
				}
				if (phone) {
					duration.phone = phone;
				}
				await duration.save();
				res.json(duration);
			}

		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	deleteDuration: async (req, res) => {
		try {
			const durationId = req.params.id;
			const duration = await Duration.findByPk(durationId);
			await duration.destroy();
			res.json('OK');
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	}
};

module.exports = durationController;
