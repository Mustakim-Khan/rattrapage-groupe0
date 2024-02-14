<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use App\Entity\Stock;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class StockFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {

        $faker = Factory::create('fr_FR');

        $users = $manager->getRepository(User::class)->findAll();
        $products = $manager->getRepository(Product::class)->findAll();

        $object = (new Stock())
            ->setSupplierName('Supplier 1')
            ->setQuantity(10)
            ->setTotalPriceHT(100.5)
            ->setTotalPriceTC(105.5)
            ->setDeliveryPrice(10.5)
            ->setVehicleType('Truck')
            ->setVehicleNumberplate('AB-123-CD')
            ->setDatetime($faker->dateTimeBetween('now', '+1 year'))
            ->setProduct($products[0])
            ->setStatus('Delivery');
        $manager->persist($object);


        $object = (new Stock())
            ->setSupplierName('Supplier 2')
            ->setQuantity(20)
            ->setTotalPriceHT(200.5)
            ->setTotalPriceTC(205.5)
            ->setDeliveryPrice(20.5)
            ->setVehicleType('Truck')
            ->setVehicleNumberplate('AB-123-CD')
            ->setDatetime($faker->dateTimeBetween('now', '+1 year'))
            ->setProduct($products[1])
            ->setStatus('Rayon')
            ->setRayonName('Rayon 1')
            ->setRayonSetter($users[0]);
        $manager->persist($object);


        $object = (new Stock())
            ->setSupplierName('Supplier 3')
            ->setQuantity(30)
            ->setTotalPriceHT(300.5)
            ->setTotalPriceTC(305.5)
            ->setDeliveryPrice(30.5)
            ->setVehicleType('Truck')
            ->setVehicleNumberplate('AB-123-CD')
            ->setDatetime($faker->dateTimeBetween('now', '+1 year'))
            ->setProduct($products[2])
            ->setStatus('Destruction')
            ->setDestructionReason('Expired');
        $manager->persist($object);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
            ProductFixtures::class,
        ];
    }
}
