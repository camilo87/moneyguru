<#ftl encoding='UTF-8'>
<#setting url_escaping_charset='UTF-8'>

<#assign creditCards = searchResults.getResults()>

<title>Cartão Pré-pago</title>
<#include "../inc/header.ftl">
<link rel="stylesheet" type="text/css" href="${CSS_PATH}/landing.css?version=${stVersionTool.version}" />

	<div class="stripe">
		<div class="wrapper">
			<#--a class="helper">refazer busca</a-->
			<h2>Cartões “Pré-Pagos”</h2>
		</div>
	</div>

	<div class="compareCards">
		<div class="wrapper">
			<div class="noResults">Nenhum cartão adicionado à comparação</div>
			<a class="closebt">Fechar x</a>
			<div>
				<h4>Compare cartões</h4> <span class="indexComparing">(<span class="comparingNumber">0</span>/4)</span>
			</div>

			<div id="cardComparisonList">
				<ul>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>

				<a href="cartao-pre-pago/comparar?" id="doCompare">comparar</a>
			</div>
		</div>
	</div>

	<div class="beneficios">
		<div class="wrapper">
			<ul>
				<li>Controle seus gastos</li>
				<li>Compre pela internet</li>
				<li>Mais segurança</li>
			</ul>
		</div>
	</div>



	<main class="page">
		<div class="wrapper">
			<section class="credit-cards featured">
				<h3>O cartão certo pra você</h3>
				<div class="cardUnit"></div>
				<#list 0..1 as i>
					<#include "../templates/credit-card.ftl">
				</#list>
			</section>

			<section class="credit-cards more">
				<h3>Conheça também&hellip;</h3>
				<div class="cardUnit"></div>
				<#list 2..creditCards?size-1 as i>
					<#include "../templates/credit-card.ftl">
				</#list>
			</section>

		</div>

	</main>

	<#include "../inc/footer.ftl">

<#-- Scripts -->
<script src="${JS_PATH}/landing.js?version=${stVersionTool.version}" charset="UTF-8"></script>
</body>
</html>