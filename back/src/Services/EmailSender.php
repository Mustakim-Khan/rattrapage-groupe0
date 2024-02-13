<?php

namespace App\Services;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class EmailSender
{
    public function __construct(
        private MailerInterface $mailer,
        private EntityManagerInterface $manager,
        private UrlGeneratorInterface $urlGenerator,
    )
    {}
    /**
     * sendEmail
     *
     * @param User $user
     * @param Array $emailData | Keys : subject, context and templateID
     * @return void
     */
    public function send(User $user,Array $emailData)
    {
        $emailTemplateDict = array(
            "URP" => "emails/user/resetPassword.html.twig",
            "CRP" => "emails/user/register.html.twig",
            "FP" => "emails/user/forgetPassword.html.twig",
        );

        $email = ((new TemplatedEmail()))
            ->from(new Address('no-reply@discord-web.com', 'Discord Web'))
            ->subject($emailData['subject'])
            ->to(new Address("moufidmoutarou04@gmail.com"))
            // ->to(new Address($user->getEmail(), $user->getUsername()))
            ->context($emailData['context'])
            ->htmlTemplate($emailTemplateDict[$emailData['templateID']]);

        // Send email
        $this->mailer->send($email);
    }
}