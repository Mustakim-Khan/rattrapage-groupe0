<?php

namespace App\Security;

use App\Entity\User;
use App\Services\EmailSender;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class EmailVerifier
{
    public function __construct(
        private MailerInterface $mailer,
        private EmailSender $emailSender,
        private EntityManagerInterface $manager,
        private UrlGeneratorInterface $urlGenerator,
    )
    {}

    public function sendEmailConfirmation(User $user)
    {
        $url = $this->urlGenerator->generate('verify_email', [
            'token' => $user->getToken(),
        ], 0);

        $this->emailSender->send($user, array(
            'subject' => 'Confirmation : Account created',
            'templateID' => 'CRP',
            'context' => [
                'username' => $user->getUsername(),
                'url' => $url,
            ]
        ));
        
        return json_encode(true, 200);
    }

    // /**
    //  * @throws VerifyEmailExceptionInterface
    //  */
    // public function handleEmailConfirmation(Request $request, User $user): void
    // {
    //     $this->verifyEmailHelper->validateEmailConfirmation($request->getUri(), $user->getId(), $user->getEmail());

    //     $user->setIsVerify(true);

    //     $this->entityManager->persist($user);
    //     $this->entityManager->flush();
    // }
}