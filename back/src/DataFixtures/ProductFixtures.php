<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        $faker = Factory::create('fr_FR');

        $categories = $manager->getRepository(Category::class)->findAll();

        $object = (new Product())
            ->setTitle('Product 1')
            ->setIsAvailable(true)
            ->setPa(10.5)
            ->setPv(15.5)
            ->setPht(12.5)
            ->setExpireDate($faker->dateTimeBetween('now', '+1 year'))
            ->setCategory($faker->randomElement($categories))
        ;
        $manager->persist($object);


        $object = (new Product())
            ->setTitle('Product 2')
            ->setIsAvailable(true)
            ->setPa(20.5)
            ->setPv(25.5)
            ->setPht(22.5)
            ->setExpireDate($faker->dateTimeBetween('now', '+1 year'))
            ->setCategory($faker->randomElement($categories))
        ;
        $manager->persist($object);


        $object = (new Product())
            ->setTitle('Product 3')
            ->setIsAvailable(false)
            ->setPa(30.5)
            ->setPv(35.5)
            ->setPht(32.5)
            ->setExpireDate($faker->dateTimeBetween('now', '+1 year'))
            ->setCategory($faker->randomElement($categories))
        ;
        $manager->persist($object);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            CategoryFixtures::class,
        ];
    }
}
