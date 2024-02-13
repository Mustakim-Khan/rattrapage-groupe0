<?php
namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\RequestStack;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use App\Security\EmailVerifier;
use Symfony\Component\HttpFoundation\RedirectResponse;

#[AsController]
class EmailVerifierController extends AbstractController
{
    public function __construct(
        private EmailVerifier $emailVerifier,
        private RequestStack $request,
        private ManagerRegistry $managerRegistry,
    ) {}

    #[Route(
        name: 'verify_email',
        path: '/verify/email/{token}',
    )]
    public function __invoke($token)
    {
        // On recherche si un utilisateur avec ce token existe dans la base de données
        $user = $this->managerRegistry->getRepository(User::class)->findOneBy(['token' => $token]);

        // Si aucun utilisateur n'est associé à ce token
        if(!$user || !$user->isIsVerify()){
            // throw $this->createNotFoundException('Cet utilisateur n\'existe pas');
            return $this->json(false);
        }
        
        // On supprime le token
        $user->setToken(null);
        $user->setIsVerify(true);
        $entityManager = $this->managerRegistry->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        // return new RedirectResponse($this->getParameter('app.host_front') ."login");
        return $this->json(true);
    }
}