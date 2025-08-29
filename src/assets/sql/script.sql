CREATE TABLE utilisateur
(
  id                    BIGSERIAL PRIMARY KEY,
  nom                   VARCHAR(255) NOT NULL,
  prenom                VARCHAR(255) NOT NULL,
  telephone             VARCHAR(50)  NOT NULL,
  email                 VARCHAR(255) NOT NULL UNIQUE,
  mot_de_passe          VARCHAR(255) NOT NULL,
  provider              VARCHAR(255) NOT NULL,
  date_creation         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  derniere_modification TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role
(
  id  BIGSERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL
);

CREATE TABLE role_utilisateur
(
  id             BIGSERIAL PRIMARY KEY,
  id_utilisateur BIGINT NOT NULL,
  id_role        BIGINT NOT NULL,
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur (id) ON DELETE CASCADE,
  FOREIGN KEY (id_role) REFERENCES role (id) ON DELETE CASCADE
);

CREATE TABLE agence
(
  id                    BIGSERIAL PRIMARY KEY,
  nom                   VARCHAR(255) NOT NULL,
  adresse               VARCHAR(255) NOT NULL,
  ville                 VARCHAR(255) NOT NULL,
  horaire_ouverture     TIME         NOT NULL,
  horaire_fermeture     TIME         NOT NULL,
  derniere_modification TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicule
(
  id                    BIGSERIAL PRIMARY KEY,
  id_agence             BIGINT        NOT NULL,
  marque                VARCHAR(255)  NOT NULL,
  modele                VARCHAR(255)  NOT NULL,
  categorie             VARCHAR(255)  NOT NULL,
  tarif_journalier      DECIMAL(8, 2) NOT NULL,
  statut                VARCHAR(50)   NOT NULL CHECK (statut IN ('disponible', 'reserve', 'maintenance')),
  derniere_modification TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_agence) REFERENCES agence (id) ON DELETE CASCADE
);

CREATE TABLE reservation
(
  id                    BIGSERIAL PRIMARY KEY,
  id_utilisateur        BIGINT        NOT NULL,
  id_vehicule           BIGINT        NOT NULL,
  id_agence_depart      BIGINT        NOT NULL,
  id_agence_arrivee     BIGINT        NOT NULL,
  date_debut            TIMESTAMP     NOT NULL,
  date_fin              TIMESTAMP     NOT NULL,
  montant_total         DECIMAL(8, 2) NOT NULL,
  statut                VARCHAR(50)   NOT NULL,
  derniere_modification TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur (id) ON DELETE CASCADE,
  FOREIGN KEY (id_vehicule) REFERENCES vehicule (id),
  FOREIGN KEY (id_agence_depart) REFERENCES agence (id),
  FOREIGN KEY (id_agence_arrivee) REFERENCES agence (id)
);

CREATE TABLE paiement
(
  id                    BIGSERIAL PRIMARY KEY,
  id_reservation        BIGINT        NOT NULL,
  montant               DECIMAL(8, 2) NOT NULL,
  mode                  VARCHAR(50)   NOT NULL,
  statut                VARCHAR(50)   NOT NULL,
  date_paiement         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  derniere_modification TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  stripe_id             VARCHAR(255)  NOT NULL,
  FOREIGN KEY (id_reservation) REFERENCES reservation (id) ON DELETE CASCADE
);

CREATE TABLE conversation_support
(
  id                    BIGSERIAL PRIMARY KEY,
  type                  VARCHAR(50) NOT NULL,
  statut                BOOLEAN     NOT NULL,
  date_debut            TIMESTAMP   NOT NULL,
  date_fin              TIMESTAMP,
  derniere_modification TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_utilisateur        BIGINT      NOT NULL,
  id_agent              BIGINT      NOT NULL,
  talkjs_id             BIGINT      NOT NULL,
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur (id) ON DELETE CASCADE,
  FOREIGN KEY (id_agent) REFERENCES utilisateur (id) ON DELETE CASCADE
);
