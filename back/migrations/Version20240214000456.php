<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240214000456 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE stock_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE stock (id INT NOT NULL, product_id INT DEFAULT NULL, rayon_setter_id UUID DEFAULT NULL, supplier_name VARCHAR(255) NOT NULL, quantity INT NOT NULL, total_price_ht DOUBLE PRECISION NOT NULL, total_price_tc DOUBLE PRECISION NOT NULL, delivery_price DOUBLE PRECISION NOT NULL, vehicle_type VARCHAR(255) NOT NULL, vehicle_numberplate VARCHAR(255) NOT NULL, datetime TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, rayon_name VARCHAR(255) DEFAULT NULL, destruction_reason VARCHAR(255) DEFAULT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4B3656604584665A ON stock (product_id)');
        $this->addSql('CREATE INDEX IDX_4B36566095948543 ON stock (rayon_setter_id)');
        $this->addSql('COMMENT ON COLUMN stock.rayon_setter_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE stock ADD CONSTRAINT FK_4B3656604584665A FOREIGN KEY (product_id) REFERENCES product (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE stock ADD CONSTRAINT FK_4B36566095948543 FOREIGN KEY (rayon_setter_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE stock_id_seq CASCADE');
        $this->addSql('ALTER TABLE stock DROP CONSTRAINT FK_4B3656604584665A');
        $this->addSql('ALTER TABLE stock DROP CONSTRAINT FK_4B36566095948543');
        $this->addSql('DROP TABLE stock');
    }
}
