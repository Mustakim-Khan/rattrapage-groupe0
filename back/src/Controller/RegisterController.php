<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mailer\MailerInterface;
use App\Security\EmailVerifier;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class RegisterController extends AbstractController
{
    public function __construct(
        private RequestStack $requestStack,
        private ManagerRegistry $managerRegistry,
        private MailerInterface $mailer,
        private UserPasswordHasherInterface $passwordHasher,
        private EmailVerifier $emailVerifie,
    ) {}

    public function __invoke()
    {
        $email = json_decode($this->requestStack->getCurrentRequest()->getContent())->email;        
        $username = json_decode($this->requestStack->getCurrentRequest()->getContent())->username;        
        if ($this->managerRegistry->getRepository(User::class)->findOneBy(['email' => $email, 'username' => $username])) {
            // throw $this->createNotFoundException();
            return $this->json("This email has already been registered");
        }
        
        $user = (new User())
            ->setEmail($email)
            ->setUsername($username)
        ;
        
        // Hash password
        // Mettre en place Event listeners Kernel:PRE_?
        $plainPwd = json_decode($this->requestStack->getCurrentRequest()->getContent())->password;        
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $plainPwd
        );
        $user->setPassword($hashedPassword);

        // Set token
        $user->setToken(bin2hex(random_bytes(32)));
        $user->eraseCredentials();

        // Create instance
        $this->managerRegistry->getManager()->persist($user);
        $this->managerRegistry->getManager()->flush();
        
        // Send confirmation email.
        $emailResponse = $this->emailVerifie->sendEmailConfirmation($user);

        //return new RedirectResponse($this->getParameter('app.host_front') ."login");
        return $this->json($username.' registered. Check your mail for validation('.$emailResponse.').');
    }
}