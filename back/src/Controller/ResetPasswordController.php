<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Services\EmailSender;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class ResetPasswordController extends AbstractController
{
    public function __construct(
        private RequestStack $requestStack,
        private ManagerRegistry $managerRegistry,
        private UserPasswordHasherInterface $passwordHasher,
        private EmailSender $emailSender,
    ) {}

    public function __invoke(User $userId)
    {
        /** @var User $user */
        if (!$user = $this->managerRegistry->getRepository(User::class)->findOneBy(['id' => $userId->getId()])) {
            return $this->json(["User doesn't exist"], 500);
        }
        
        // Email params
        $emailData = array(
            "subject" => "Confirmation Reset password",
            "templateID" => "URP",
            "context" => [
                'username' => $user->getUsername(),
                'link' => 'http://localhost:3000/login'
            ]
        );

        // Send email
        $this->emailSender->send($user, $emailData);
        
        return $this->json(true, 200);
    }
}