const moment = require('moment');
const { Duration } = require('../models');
const strRandom = require('../helper');

const durationController = {

	getAllDuration: async (req, res) => {
		try {
			// Chargement de toutes les périodes
			const durations = await Duration.findAll({
				// Inclusion des avis aux à chacune des périodes
				include: 'review'
			});
			res.json(durations);
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	},

	getOneDuration: async (req, res) => {
		try {
			// Ciblage de la période concernée via son id (pk)
			const durationId = req.params.id;
			const duration = await Duration.findByPk(durationId, {
				// Inclusion de l'avis lié à la période
				include: 'review'
			});
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

			// On récupère la valeur de l'input et on le récupère sous la forme d'une date via new Date(), puis on la gère avec momentjs pour la moduler plus facilement
			const departureDate = moment(new Date(req.body.departureDate));
			const returnDate = moment(new Date(req.body.returnDate));

				// Tableau qui va stocker toutes les dates comprises entre la date de départ et celle de retour 
				let dateArr = [];

				// Création de la variable qui prendra la valeur des dates à push dans dateArr
				let currentDate = moment(departureDate);

				// Boucle qui permet d'obtenir toutes les dates comprises entre la date de départ et celle de retour
				while (currentDate < returnDate) {
					dateArr.push(moment(new Date(currentDate)));
					currentDate.add(1, "days");
				};

				// Exclusion de la première date dans le tableau (déjà définie dans departureDate)
				const daysIncluded = dateArr.filter(date => date !== dateArr[0]);

			// Calcul du nombre de jours pour la réservation
			const daysNumber = returnDate.diff(departureDate, 'days');

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
				bodyErrors.push('Vous devez indiquer une date de retour');
			};
			if (!firstname) {
				bodyErrors.push('Vous devez indiquer un prénom');
			};
			if (!lastname) {
				bodyErrors.push('Vous devez indiquer un nom');
			};
			if (!phone) {
				bodyErrors.push('Vous devez indiquer un numéro de téléphone');
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
			// On identifie la période que l'on veut modifier
			const durationId = req.params.id;
			const duration = await Duration.findByPk(durationId);
			
			if (!duration) {
				res.status(404).send(`Aucune période de l'id ${durationId} n'a été trouvée`);
			} else {
				
				// Même principe que ci-dessus
				const newDepartureDate = moment(new Date(req.body.newDepartureDate));
				const newReturnDate = moment(new Date(req.body.newReturnDate));

					let dateArr = [];
					let currentDate = moment(newDepartureDate);
					while (currentDate < newReturnDate) {
						dateArr.push(moment(new Date(currentDate)));
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
			res.json(`La période de l'id ${durationId} a bien été supprimé`);
		} catch (error) {
			console.trace(error);
			res.status(500).send(error);
		}
	}
};

module.exports = durationController;
