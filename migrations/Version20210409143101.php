<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210409143101 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE participant ADD recipient_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE participant ADD CONSTRAINT FK_D79F6B11E92F8F78 FOREIGN KEY (recipient_id) REFERENCES participant (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D79F6B11E92F8F78 ON participant (recipient_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE participant DROP FOREIGN KEY FK_D79F6B11E92F8F78');
        $this->addSql('DROP INDEX UNIQ_D79F6B11E92F8F78 ON participant');
        $this->addSql('ALTER TABLE participant DROP recipient_id');
    }
}
