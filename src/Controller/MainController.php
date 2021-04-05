<?php

namespace App\Controller;

use App\Entity\Event;
use App\Form\EventType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function home(Request $request): Response
    {
        $event = new Event;
        
        $form = $this->createForm(EventType::class, $event);
        
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($event);

            $participants = $event->getParticipants();
            $host = $participants[1];
            $host->setIsHost(true);

            foreach ($participants as $participant) {
                $participant->setEvent($event);
            }
            $em->flush();

            $this->addFlash('success', 'event added');

            return $this->redirectToRoute('home');
        }

        return $this->render('main/home.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
