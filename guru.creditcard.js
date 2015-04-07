//--------------------------------------------------------------------------------
//
//  Módulo de cartão de crédito - pedaços do código completo
//  Criado de acordo com o Revealing Module Pattern
//
//--------------------------------------------------------------------------------
guru.creditcard = (function()
{
	"use strict";

	function addtoComparison(creditCardId)
	{
		var $addingCard = $('a.compare[data-id="'+creditCardId+'"]');
		var urlAdded = 'id='+creditCardId+'&';

		if ($addingCard.hasClass('disabled')) return false;

		if(COMPARING.indexOf(creditCardId) == -1)
		{
			// Ativa o modo de comparação
			$('.compareCards').addClass('active');

			var addedCardImg	=	$addingCard.closest('li.credit-card').find('div img').clone();

			var $addedSlot = $('#cardComparisonList ul li').not('.added').eq(0)
											.append('<a data-id="'+creditCardId+'"><span></span></a>')
											.addClass('added');
			$('a', $addedSlot).append(addedCardImg);

			enableComparing();

		}
		else {
			removeFromComparison(creditCardId);
		}
	}

	function removeFromComparison(creditCardId)
	{
		// creditCardId		=	
		var compareList		=	$('#cardComparisonList li a[data-id="'+creditCardId+'"]');
		var	cardListId		=	$('main a.compare[data-id="'+creditCardId+'"]');
		var urlAdded 		=	'id='+creditCardId+'&';

		compareList.removeClass('added');
		cardListId.removeClass('added').text('comparar');

		// exclui cartão do array na posição correta
		var deletedCard;
		for (var i=0; i<COMPARING.length; i++)
		{
			if (COMPARING[i] == creditCardId)
			{
				deletedCard = i;
				$('#doCompare').attr('href', function(index, value) {
					return value.replace(urlAdded, "");
				});
			}
		}
		COMPARING.splice(deletedCard, 1);

		// exclui todos os cartões (serão readicionados abaixo) para reordernação do array
		compareList.parent().removeClass('added');
		compareList.remove();

		// atualiza o contador de cartões adicionados à comparação
		$('.comparingNumber').text(COMPARING.length);

		$('#cardComparisonList ul li')
			.removeClass('added')
			.html('');


		// readiciona e organiza o array e a lista de cartões adicionados para comparação
		for (var i=0; i<COMPARING.length; i++)
		{
			var addedCardImg		=	$('main a.compare[data-id="'+COMPARING[i]+'"]').closest('li.credit-card').find('div img').clone();

			var $addedSlot = $('#cardComparisonList ul li').not('.added')
											.eq(0)
											.append('<a data-id="'+COMPARING[i]+'"><span></span></a>')
											.addClass('added');

			if (COMPARING.length > 0) $('a', $addedSlot).append(addedCardImg);
		}

			if (COMPARING.length < MAX_COMPARE) {
				$('a.compare').not('.added').removeClass('disabled');
			}

		if (COMPARING.length == 0) eraseComparing();

		enableComparing();		
	}


	function eraseComparing()
	{
		$('#cardComparisonList ul li').html('').removeClass('added');
		$('.doCompare').addClass('inactive');
		$('.compareCards').removeClass('active');
		$('li.credit-card .actions a').removeClass('disabled');
		$('#doCompare').attr('href', function(index, value) {
			return 'cartao-pre-pago/comparar?';
		})
		$('a.compare').removeClass('added').text('comparar');
		COMPARING = [];
	}

	// oculta a barra de comparação e limpa os cartões que estavam na lista
	$('a.closebt').click(function(){
		eraseComparing()
	});


	function gotoConfirmation(creditCardId, creditCardUrl)
	{
		$.get('/comparador/cartao-pre-pago/confirmacao', function(data) {
			$('.overlay .modal').html(data);
			$('.splash a').attr('href', creditCardUrl);
			guru2.modal.openModal();
		});
	}



	function submitHandler()
	{
		$('.solicite').click(function(e) {
			return false;
		});


		$('.solicite').click(function(e){

			var s_user_name 			= $('#s_user_name').val()
			var s_user_email 		= $('#s_user_email').val()
			var lead_user_phone 		= $('#s_user_mobile_number').val()
			var lead_user_extra_phone 	= $('#s_user_telephone_number').val()
			var s_user_cpf 			= $('#s_user_cpf').val()

			// Monta o objeto do botão
			var $button = $(this);

			dataLayer.push({
				'event'			:	'handpick',
				'Product'		:	'Credit Card',
				'Product-type'	:	'PRE',
				'issuer'		:	$(this).attr('data-issuer'),
				'Credit-Card-ID':	$(this).attr('data-id')
			})


			if(!/^http(s)?:\/\/(.*)\.moneyguru\.com\.br\//.test($button.attr('href'))) {


				// Previne a ação padrão do clique
				e.preventDefault();

				if (guru2.cookie.getCookie('splashStatus') == "1") {

					/* @todo Refactor  */
					// Abertura do formulário de lead simples
					guru2.modal.openSplash('/include/lead-simple', '/action/11', null, '14', 'PRE', function() {

						// Inserção nos dados do cartão no formulário
						$('.overlay input[name=s_p14_carrier_name]').val($button.attr('data-issuer'));
					});
				}

				else if(guru2.cookie.getCookie('splashStatus') == '2')
				{
					guru2.modal.openSplash('/include/lead-simple', '/action/11', null, '14', 'PRE', function() {
						// Inserção nos dados do cartão no formulário
						$('.overlay input[name=s_p14_carrier_name]').val($button.attr('data-issuer'));

						$("#s_user_name").val(s_user_name);
						$(".email").val(s_user_email);
						$('#lead-simple-form').submit();
					});
				}
			}
			else {
				window.location.href = $button.attr('href');
			}
		});
	}

}());

$(document).ready(function(){guru.creditcard.init();})