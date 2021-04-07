<?php

namespace App\Controller;

use App\Entity\Event;
use App\Form\EventType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function home(Request $request, MailerInterface $mailer): Response
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
            
            $mail = (new Email())
                ->from('secret@santa.com')
                ->to($host->getEmail())
                ->subject('Confirm your draw')
                ->text('test text');

            $mailer->send($mail);

            return $this->redirectToRoute('home');
        }

        return $this->render('main/home.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/confirm", name="confirm", methods={"GET"})
     */
    public function confirm()
    {
        return $this->render('main/confirm.html.twig');
    }

    /**
     * @Route("/success", name="success", methods={"GET"})
     */
    public function success()
    {
        return $this->render('main/success.html.twig');
    }
}