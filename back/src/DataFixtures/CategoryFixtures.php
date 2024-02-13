<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        $faker = Factory::create('fr_FR');

        $object = (new Category())
            ->setTitle('Category 1')
        ;
        $manager->persist($object);


        $object = (new Category())
            ->setTitle('Category 2')
        ;
        $manager->persist($object);


        $object = (new Category())
            ->setTitle('Category 3')
        ;
        $manager->persist($object);

        $manager->flush();
    }
}
