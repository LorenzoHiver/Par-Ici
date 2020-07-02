const moment = require('moment');
const { Duration } = require('../models');
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
				res.status(404).send(`Aucune période de l'id ${durationId} n'a été trouvée`);
			}

		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	createDuration: async (req, res) => {
		try {

			// On récupère la valeur de l'input et on le récupère sous la forme d'une date via momentjs. Pour une raison obscure, l'input récupéré est déduis de 1 journée, par conséquent on rajoute une journée à cette valeur pour palier au problème.
			const departureDate = moment(req.body.departureDate).add(1, 'days');
			const returnDate = moment(req.body.returnDate).add(1, 'days');

				// Tableau qui va stocker toutes les dates comprises entre la date de départ et celle de retour 
				let dateArr = [];

				// Création de la variable qui prendra la valeur des dates à push dans dateArr
				let currentDate = moment(departureDate);

				// Boucle qui permet d'obtenir toutes les dates comprises entre la date de départ et celle de retour
				while (currentDate < returnDate) {
				dateArr.push(currentDate.format('YYYY-MM-DD'));
				currentDate.add(1, "days");
				};

				// Exclusion de la première date dans le tableau (déjà définie dans departureDate)
				const daysIncluded = dateArr.filter(date => date !== dateArr[0]);

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

			// Test de présence des paramètres
			let bodyErrors = [];

			// Pas besoin d'erreur sur la date de départ qui est par défaut à la date de la réservation
			if (!returnDate) {
				bodyErrors.push('Vous devez sélectionner une date de retour');
			};
			if (!firstname) {
				bodyErrors.push('Vous devez indiquer un prénom');
			};
			if (!lastname) {
				bodyErrors.push('Vous devez indiquer un nom');
			};
			if (!phone) {
				bodyErrors.push('Vous devez indiquer un numéro de téléphone afin que nous puissions vous joindre si nécessaire');
			};
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
				res.status(404).send(`Aucune période de l'id ${durationId} n'a été trouvée`);
			} else {

				const newDepartureDate = moment(req.body.newDepartureDate).add(1, "days");
				const newReturnDate = moment(req.body.newReturnDate).add(1, "days");

					let dateArr = [];
					let currentDate = moment(newDepartureDate);
					while (currentDate < newReturnDate) {
						dateArr.push(currentDate.format("YYYY-MM-DD"));
						currentDate.add(1, "days");
					};
					const daysIncluded = dateArr.filter(date => date !== dateArr[0]);

				const daysNumber = newReturnDate.diff(newDepartureDate, 'days') + 1;

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
				durationController.getOneDuration(req, res);
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
