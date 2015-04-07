<#include "inc/base.ftl">

<#assign JS_PATH	= "${environmentTool.getResourceUrl('js')}/telecom"> 


<#macro page_head>
	<#-- CSS -->
	<link rel="stylesheet" type="text/css" href="${CSS_PATH}/landing.css?version=${stVersionTool.version}" />

	<title>Escolha o melhor combo para você - MoneyGuru</title>
</#macro>

<#macro page_body>
	<div class="content">

	<div class="stripe">
		<div class="wrapper">
			<h2>TV, internet e telefone</h2>
		</div>
	</div>
		<main>
			<div class="wrapper">
				<div>
					<h1>Escolha o melhor combo para você</h1>
					<ul>
						<li class="velocidade"><div></div>Navegue com mais velocidade e contrate até 6 GB</li>
						<li class="minutos"><div></div>Minutos para falar à vontade com outros fixos e até celulares </li>
						<li class="canais"><div></div> Mais de 200 canais com filmes, séries e entretenimento</li>
					</ul>
				</div>
			</div>
		</main>

		<section class="plans">
			<div class="wrapper tabs">

				<nav>
					<ul>
					</ul>
				</nav>

				<h2>As melhores opções</h2>

				<header>
					<div class="provider">
						Operadora
					</div>
					<div class="price">
						Valor
					</div>
					<div class="speed">
						Internet
					</div>
					<div class="tv">
						TV
					</div>
					<div class="minutes">
						Minuto Fixo
					</div>
				</header>

				<section class="below70">
					<#assign type = "landing">
					<#include "templates/plan.ftl">
				</section>

				<section class="150and250 hide">
					<#assign type = "landing">
					<#include "templates/plan.ftl">
				</section>

				<section class="above250 hide">
					<#assign type = "landing">
					<#include "templates/plan.ftl">
				</section>

			</div>

			<a href="/comparador/telecom/confirmacao?type=pj" class="btn">Quero o melhor plano pra minha empresa</a>
		</section>

	</div>

	<#-- Scripts -->
	<script src="${JS_PATH}/landing.js?version=${stVersionTool.version}"></script>
</#macro>