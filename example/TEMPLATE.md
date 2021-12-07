# Example

{% for repo in repositories %}
  {{ repo.name }}
  {{ repo.url }}
  {{ repo.stargazerCount }}
  {{ repo.description }}
{% endfor %}

{% for con in contributed %}
  {{ con.name }}
  {{ con.url }}
  {{ con.stargazerCount }}
  {{ con.description }}
{% endfor %}
