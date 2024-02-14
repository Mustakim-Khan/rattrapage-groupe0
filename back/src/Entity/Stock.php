<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\StockRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StockRepository::class)]
#[ApiResource]
#[Get()]
#[GetCollection()]
#[Post(
    // security: "is_granted('ROLE_ADMIN')"
)]
#[Delete(
    // security: "is_granted('ROLE_ADMIN')"
)]
#[Patch(
    // security: "is_granted('ROLE_ADMIN')"
)]
class Stock
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $supplierName = null;

    #[ORM\Column]
    private ?int $quantity = null;

    #[ORM\Column]
    private ?float $totalPriceHT = null;

    #[ORM\Column]
    private ?float $totalPriceTC = null;

    #[ORM\Column]
    private ?float $deliveryPrice = null;

    #[ORM\Column(length: 255)]
    private ?string $vehicleType = null;

    #[ORM\Column(length: 255)]
    private ?string $vehicleNumberplate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $datetime = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $rayonName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $destructionReason = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\OneToOne(inversedBy: 'stock', cascade: ['persist', 'remove'])]
    private ?Product $product = null;

    #[ORM\ManyToOne(inversedBy: 'stocks')]
    private ?User $rayonSetter = null;

    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSupplierName(): ?string
    {
        return $this->supplierName;
    }

    public function setSupplierName(string $supplierName): self
    {
        $this->supplierName = $supplierName;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getTotalPriceHT(): ?float
    {
        return $this->totalPriceHT;
    }

    public function setTotalPriceHT(float $totalPriceHT): self
    {
        $this->totalPriceHT = $totalPriceHT;

        return $this;
    }

    public function getTotalPriceTC(): ?float
    {
        return $this->totalPriceTC;
    }

    public function setTotalPriceTC(float $totalPriceTC): self
    {
        $this->totalPriceTC = $totalPriceTC;

        return $this;
    }

    public function getDeliveryPrice(): ?float
    {
        return $this->deliveryPrice;
    }

    public function setDeliveryPrice(float $deliveryPrice): self
    {
        $this->deliveryPrice = $deliveryPrice;

        return $this;
    }

    public function getVehicleType(): ?string
    {
        return $this->vehicleType;
    }

    public function setVehicleType(string $vehicleType): self
    {
        $this->vehicleType = $vehicleType;

        return $this;
    }

    public function getVehicleNumberplate(): ?string
    {
        return $this->vehicleNumberplate;
    }

    public function setVehicleNumberplate(string $vehicleNumberplate): self
    {
        $this->vehicleNumberplate = $vehicleNumberplate;

        return $this;
    }

    public function getDatetime(): ?\DateTimeInterface
    {
        return $this->datetime;
    }

    public function setDatetime(\DateTimeInterface $datetime): self
    {
        $this->datetime = $datetime;

        return $this;
    }

    public function getRayonName(): ?string
    {
        return $this->rayonName;
    }

    public function setRayonName(?string $rayonName): self
    {
        $this->rayonName = $rayonName;

        return $this;
    }

    public function getDestructionReason(): ?string
    {
        return $this->destructionReason;
    }

    public function setDestructionReason(?string $destructionReason): self
    {
        $this->destructionReason = $destructionReason;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getRayonSetter(): ?User
    {
        return $this->rayonSetter;
    }

    public function setRayonSetter(?User $rayonSetter): self
    {
        $this->rayonSetter = $rayonSetter;

        return $this;
    }
}
